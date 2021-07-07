### Google Cloud Run

- Login to https://console.cloud.google.com/
- Navigate to https://console.cloud.google.com/run
- Select or create the project you want to use
- `gcloud init`
  - Select project
- `gcloud config list`
  - Should show your project
- `gcloud builds submit --tag gcr.io/<PROJECT_ID>/dynasty-baseball`
  - I was building to `build` and that is auto excluded in the gcp build process, moved to dist
- `gcloud run deploy --image=gcr.io/<PROJECT_ID>/dynasty-baseball --platform managed`
  - I was running on 3000, gcp expects you to expose 8080
- By default the iam policy should be restricted, but you can allow public access: 
  - `gcloud run services add-iam-policy-binding dynasty-baseball --member=allUsers --role=roles/run.invoker`
  - I couldn't get allAuthenticatedUsers to work unless I added both allUsers then allAuthenticatedUsers, then removed allUsers???