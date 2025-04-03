# Git Workflow

## Branching Strategy
- `main` branch is the production branch
- `develop` branch is for ongoing development
- Feature branches branch off from `develop`
- Hotfix branches branch off from `main`
- Use descriptive branch names in the format `type/description`:
  - `feature/add-player-stats`
  - `bugfix/fix-card-display`
  - `hotfix/security-patch`
  - `chore/update-dependencies`

## Commits
- Write clear, concise commit messages
- Use present tense ("Add feature" not "Added feature")
- Follow conventional commits format:
  ```
  <type>(<scope>): <description>
  
  [optional body]
  
  [optional footer]
  ```
- Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep commits small and focused on a single change

## Pull Requests
- Create a pull request (PR) for each feature or fix
- Use a standard PR template
- Include a clear description of changes
- Link to related issues
- Require at least one review before merging
- Squash commits when merging to keep history clean

## Code Reviews
- Review for correctness, style, and maintainability
- Be respectful and constructive in comments
- Respond to comments in a timely manner
- Approve only when all comments are addressed

## Continuous Integration
- All PRs must pass CI checks before merging
- Run tests and linting on all branches
- Automate deployment where possible 