### Azure

- Sign up for azure
- `az group create --name dynasty-baseball --location eastus`
- Dont have the image published anywhere so I guess I need a ACR
  - `az acr create --name dynastybaseballacr --resource-group dynasty-baseball --sku Basic --admin-enabled true`
  - `az acr credential show --resource-group dynasty-baseball --name dynastybaseballacr`
    - You will need these credentials for `docker login` and for `az container create`
  - `docker login dynastybaseballacr.azurecr.io --username dynastybaseballacr`
  - `docker tag eacaps/dynasty-baseball dynastybaseballacr.azurecr.io/eacaps-dynasty-baseball:latest`
  - `docker push dynastybaseballacr.azurecr.io/eacaps-dynasty-baseball:latest`
- Okay now we can do this
  - `az container create --resource-group dynasty-baseball --name dynasty-baseball --image dynastybaseballacr.azurecr.io/eacaps-dynasty-baseball:latest --dns-name-label eacaps-dynasty-baseball --ports 8080`
    - I couldn't figure out how to bind 8080 to 80 on aci so this runs at http://eacaps-dynasty-baseball.eastus.azurecontainer.io:8080/ (not ideal)