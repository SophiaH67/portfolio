# Variables
- NEXT_PUBLIC_GITHUB
- NEXT_PUBLIC_NAME
- NEXT_PUBLIC_EMAIL
- NEXT_PUBLIC_API_BASE

## Example docker build
```bash
docker build \
  --build-arg NEXT_PUBLIC_GITHUB=marnixah \
  --build-arg NEXT_PUBLIC_NAME="Marnix Hage" \
  --build-arg NEXT_PUBLIC_EMAIL "business@marnixah.com" \
  --build-arg NEXT_PUBLIC_API_BASE="http://your.domain.tld/api/" \
  -t yourname/portfolio-frontend:latest
```