<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/c512a663-95d4-4e57-85b2-6947d872d9f1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set `GEMINI_API_KEY` in the server environment
3. Run `npm run build` followed by `npm start`. For hot reload, start `npm run dev` in a second terminal.

## Thanksgiving and local development

Install with `npm ci`. Run `npm run build` and `npm start` for Express on port 8080. For frontend editing, also run `npm run dev` on port 3000. Vite proxies API calls to Express. Set the Gemini key only in the server environment or an ignored server-side `.env` file. The starter planner, swaps, shopping lists and leftovers work offline from Gemini. Use `npm run lint` for TypeScript and `npm test` for planner regression checks.

## Cloud Run release and rollback

The configured Cloud Build pipeline builds and pushes a commit-tagged image and deploys the `pantrypivot` service in `us-central1`. Before an approved release, confirm the trigger's source commit and project. Capture the current routing and ready revision with the command below. Keep the output for rollback, including any split percentages.

```sh
gcloud run services describe pantrypivot --region=us-central1 --project="$PROJECT_ID" --format='yaml(status.traffic,status.latestReadyRevisionName,spec.template.spec.containers[0].image)'
```

Run the existing Cloud Build trigger for the approved commit. After success, describe the service again. Inspect the new revision's image and readiness and confirm its image matches the approved commit tag or digest. If traffic is still pinned to an older revision, explicitly promote the verified revision after release approval.

```sh
gcloud run revisions describe "$NEW_REVISION" --region=us-central1 --project="$PROJECT_ID" --format='yaml(metadata.name,spec.containers[0].image,status.imageDigest,status.conditions)'
gcloud run services update-traffic pantrypivot --region=us-central1 --project="$PROJECT_ID" --to-revisions="$NEW_REVISION=100"
curl -fsS https://pantrypivot.com/api/version
curl -fsS https://pantrypivot.com/thanksgiving
```

Check the public version response against the new revision name. Open the planner, build a starter menu, swap a dish and submit one ordinary recipe request. Check the API response and input retention on errors. If rollback is required, restore the exact previous traffic allocation, then verify service traffic and the public site again. A pre-feature revision may serve the homepage at the version endpoint.

```sh
# PREVIOUS_ALLOCATION is the recorded revision=percentage list, comma-separated.
gcloud run services update-traffic pantrypivot --region=us-central1 --project="$PROJECT_ID" --to-revisions="$PREVIOUS_ALLOCATION"
```

Cloud Run loads GEMINI_API_KEY from Secret Manager. For Gemini HTTP 402, verify the project that owns the deployed key is linked to the funded Gemini billing account. An account balance alone cannot identify the deployed key's project. Keep key values out of client builds, chat and logs. After an authorized secret rotation, deploy a new revision and verify traffic before retesting.
