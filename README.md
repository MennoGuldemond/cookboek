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

## Frontend CI/CD (Azure Static Web Apps)

This repository now contains a GitHub Actions workflow for frontend deployments:

- `develop` branch deploys to `tst`
- `main` branch deploys to `prd`
- Manual deployments are possible from Actions (`workflow_dispatch`)

### 1. Create low-cost Azure resources

For a hobby project, use Azure Static Web Apps.

- Create one Static Web App for `tst`
- Create one Static Web App for `prd`

### 2. Add GitHub environment secrets

In GitHub repository settings, create environments:

- `tst`
- `prd`

For each environment, add this secret:

- `AZURE_STATIC_WEB_APPS_API_TOKEN` = deployment token from the matching Static Web App in Azure Portal

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
