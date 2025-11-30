# Docker Quick Reference Guide

## 🚀 Quick Start Commands

### Development Mode (with hot reload)
```bash
docker-compose up devex-dev
# Access at: http://localhost:3000
# Press Ctrl+C to stop
```

### Production Mode
```bash
docker-compose up devex-prod
# Access at: http://localhost:8080
# Press Ctrl+C to stop
```

### Run Tests
```bash
docker-compose --profile test up devex-test
```

---

## 📋 Common Commands

### Start services in background
```bash
docker-compose up -d devex-dev
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f devex-dev
```

### Rebuild after changes
```bash
docker-compose up --build devex-dev
```

### Complete cleanup
```bash
docker-compose down -v
```

---

## 🐳 Direct Docker Commands

### Build images
```bash
# Development
docker build -t devex:dev --target development .

# Production
docker build -t devex:prod --target production .
```

### Run containers
```bash
# Development with volume mounting
docker run -it --rm \
  -p 3000:3000 \
  -v "$(pwd)/website:/app:cached" \
  -v devex_node_modules:/app/node_modules \
  devex:dev

# Production
docker run -it --rm -p 8080:80 devex:prod
```

---

## 🔧 Troubleshooting

### Changes not reflecting?
```bash
docker-compose restart devex-dev
```

### Port already in use?
Edit `docker-compose.yml` and change:
```yaml
ports:
  - "3001:3000"  # Change 3000 to 3001
```

### Permission issues?
```bash
sudo chown -R $USER:$USER website/
```

### Out of space?
```bash
docker system prune -a --volumes
```

### Node modules not updating?
```bash
docker-compose down -v
docker-compose up --build devex-dev
```

---

## 🎯 Typical Workflow

1. **Start development environment:**
   ```bash
   docker-compose up devex-dev
   ```

2. **Edit files in `website/` directory**
   - Changes automatically reload

3. **Test production build:**
   ```bash
   docker-compose up devex-prod
   ```

4. **Run type checking:**
   ```bash
   docker-compose --profile test up devex-test
   ```

5. **Stop everything:**
   ```bash
   docker-compose down
   ```

---

## 📦 File Structure

```
developer-experience/
├── Dockerfile              # Multi-stage build configuration
├── docker-compose.yml      # Service orchestration
├── .dockerignore          # Files to exclude from build
├── DOCKER_IMPLEMENTATION.md  # Detailed implementation notes
└── website/               # Docusaurus site (mounted in dev mode)
```

---

## 🌍 Platform Notes

**Linux:** Works natively, best performance

**macOS:** Optimized with `:cached` mounts

**Windows:** Use WSL2 backend for best results

---

## 🎨 Customization

### Change development port
Edit `docker-compose.yml`:
```yaml
ports:
  - "4000:3000"  # Dev server now on port 4000
```

### Change production port
```yaml
ports:
  - "9090:80"    # Production now on port 9090
```

### Add environment variables
```yaml
environment:
  - NODE_ENV=development
  - MY_CUSTOM_VAR=value
```

---

## 📤 Publishing Images

### Tag and push to Docker Hub
```bash
docker build -t username/devex:latest --target production .
docker push username/devex:latest
```

### Pull and run published image
```bash
docker pull username/devex:latest
docker run -p 8080:80 username/devex:latest
```

---

## ✅ Checklist for New Contributors

- [ ] Install Docker Desktop
- [ ] Clone the repository
- [ ] Run `docker-compose up devex-dev`
- [ ] Access http://localhost:3000
- [ ] Make changes to files in `website/`
- [ ] See changes auto-reload
- [ ] Test production: `docker-compose up devex-prod`
- [ ] Access http://localhost:8080

---

## 🆘 Getting Help

- Check the detailed [Docker section in README.md](./README.md#running-developer-experience-in-docker)
- Review [DOCKER_IMPLEMENTATION.md](./DOCKER_IMPLEMENTATION.md) for technical details
- Open an issue on GitHub if you encounter problems

---

**Happy Dockering! 🐳**
