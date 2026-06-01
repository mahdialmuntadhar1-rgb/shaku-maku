# Apply notes

Copy these files into the root of your repository, then run:

```bash
npm install
npm run check
npm run build
```

## Manual cleanup still needed

These generated files should be removed from git if they are not intentional project assets:

```bash
git rm nabda-bulk-report-*.json
```

## Important limitation

I did not overwrite `src/App.tsx` in this fix pack because the hosted source view in this environment truncated part of the file, which makes a safe automated refactor risky.

The rest of the pack fixes the highest-confidence issues:
- docs
- metadata
- linting
- testing
- CI
- PWA registration
- auth hardening
- repo hygiene
