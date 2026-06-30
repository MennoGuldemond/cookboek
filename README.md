## A dutch cooking recipe website

This app uses a nodejs back-end that you can find [here](https://github.com/MennoGuldemond/cookboek-api)

## Getting started

- Run "npm install"
- Set the environment variables in environment.ts
- Run the back-end (it should run on localhost:3000 by default)
- Run "npm start"

## TODO

- Volgen van "Auteurs"
- design good logo/favicon
- Improve home page
- Use AI model to analyse and save ingredients and create a search by ingredients funcion
- implement a dark-mode (theming)

## Frontend CI/CD (Azure Web App)

This repository now contains a GitHub Actions workflow for frontend deployments:

- `develop` branch deploys to `tst`
- `main` branch deploys to `prd`
- Manual deployments are possible from Actions (`workflow_dispatch`)

### 1. Create frontend Web Apps

Create one Azure Web App for `tst` and one for `prd` under your existing App Service Plan.

Target frontend URLs:

- `tst`: `https://cookboek-tst.azurewebsites.net`
- `prd`: `https://cookboek.azurewebsites.net`

You can use the manually created `tst` Web App right away.

### 2. Add GitHub environment variables and secrets

In GitHub repository settings, create environments:

- `tst`
- `prd`

For each environment (`tst` and `prd`), add:

- Variable: `AZURE_WEBAPP_NAME` = matching Web App name
- Secret: `AZURE_WEBAPP_PUBLISH_PROFILE` = publish profile XML from that Web App

Use these app names if you follow the IaC defaults:

- `tst`: `cookboek-tst`
- `prd`: `cookboek`

Alternative repo-level fallback values supported by workflow:

- Variables: `AZURE_WEBAPP_NAME_TST`, `AZURE_WEBAPP_NAME_PRD`
- Secrets: `AZURE_WEBAPP_PUBLISH_PROFILE_TST`, `AZURE_WEBAPP_PUBLISH_PROFILE_PRD`

Recommended guardrail:

- Add required reviewers on `prd` environment before deployment is allowed

### 3. Configure environment API URLs

Set the API URL in:

- `src/environments/environment.tst.ts` for `tst`
- `src/environments/environment.prd.ts` for `prd`

### 4. Workflow details

Workflow file: `.github/workflows/frontend-cicd.yml`

- Build command: `npm run build -- --configuration tst|prd`
- Angular output folder: `dist/cookboek/browser`
- Deployment action: `azure/webapps-deploy@v3`

## IaC (Bicep) for frontend Web App

Files:

- `infra/frontend-webapp.bicep`
- `infra/frontend-webapp.tst.bicepparam`
- `infra/frontend-webapp.prd.bicepparam`

Deploy example:

```bash
az deployment group create \
	--resource-group <your-rg> \
	--parameters infra/frontend-webapp.tst.bicepparam

az deployment group create \
	--resource-group <your-rg> \
	--parameters infra/frontend-webapp.prd.bicepparam
```

Adjust these values before deploying:

- `appServicePlanName`
- `webAppName`
