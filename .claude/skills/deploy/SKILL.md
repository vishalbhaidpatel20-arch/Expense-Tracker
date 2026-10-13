# Deploy Skill

This skill handles the deployment process for the application to the staging area.

## Workflow
1. **Run Tests**: Ensure the current codebase is stable.
   - Command: `npm test` (or relevant test script)
2. **Build**: Create a production-ready bundle.
   - Command: `npm run build`
3. **Push to Staging**: Upload the build artifacts to the staging environment.
   - Command: `npm run deploy:staging` (Assuming this script exists in package.json)

## Instructions for Claude
When this skill is invoked:
- Execute the tests first. If tests fail, stop immediately and report the errors to the user.
- If tests pass, proceed to the build step. If the build fails, stop and report the errors.
- Once the build is successful, push to staging.
- Confirm the deployment status to the user upon completion.
