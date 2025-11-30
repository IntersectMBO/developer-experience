# Welcome to the Intersect MBO Developer Experience Working Group

## Our Mission
We are a community of `Developer Advocates` from `IntersectMBO` focused on enhancing the developer experience within the Cardano ecosystem. Our goal is to identify, address, and improve key aspects of the development process to make building on Cardano more accessible, efficient, and rewarding. 

Learn more about our initiatives and resources at our website: [Intersect MBO Developers Experience Website](devex.intersectmbo.org/)


## What We Do

- Identify and prioritize developer experience issues in the Cardano ecosystem.
- Propose and implement solutions to improve tooling, documentation, and workflows.
- Foster collaboration between developers, projects, and stakeholders.
- Support multi-language integration.
- Develop and workshop a Developer Thriving Framework to address social barriers and improve community engagement.
- Focus on the human component of developer experience, beyond just documentation and technology.
- Organize collaborative workshops to gather diverse perspectives and create shared understanding.
- Address pain points and obstacles that hinder newcomer involvement and growth.
- Build trust and break down silos within the developer community.

## Key Focus Areas
- **Onboarding and Documentation**
- **Tooling and Development Workflows**
- **Collaboration with other developers in the ecosystem**
- **Collecting feedback from developers**
- **Community Support and Knowledge Sharing**

## How to Get Involved
- **Meetings**: Join our weekly Developer experience working group sessions by subscribing to the [Intersect Event calendar](https://calendar.google.com/calendar/u/1?cid=Y19iMGMyODE3NWE2NTBkOGUwNzIwNTM2ZGU4OWE0NDMxMjFiYTcxYTVkMDgxYmRiOWU1NGRiZTU2NjI1NGY5ZGUwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20).
- **GitHub**: Most discussions will happen in Github [issues](https://github.com/IntersectMBO/developer-experience/issues)  and [pull requests](https://github.com/IntersectMBO/developer-experience/pulls). Issues are the problems faced by the Cardano Developer community and PR's propose solutions. Participate in [discussions](https://github.com/IntersectMBO/developer-experience/discussions/) and contribute to projects
- Join **Intersect**: [Become a Member](https://members.intersectmbo.org/registration)
- **Discord**: [Dev-Ex WG](https://discord.com/channels/1136727663583698984/1250047836339306526)
- **Share Feedback**: Share your feedback on our discord and help us improve the ecosystem.

## Developer Advocates
Meet and connect with our past and present developer advocates:
- **Current Cohort**:
   - [Uche](https://www.linkedin.com/in/thisisobate)
     - Schedule a call with Uche [here](https://calendar.app.google/6HC9yHfTHrQ1dfcB9)
   - [Emmanuel](https://www.linkedin.com/in/emmanuel-shikuku-devops/)
   - [Dan](https://www.linkedin.com/in/danbaruka/)
     - X (Twitter): [@danamphred](https://x.com/danamphred)
     - Schedule a call with Dan [here](https://calendar.app.google/Ry32VJXbdgazUFe79)
   - [Harun](https://www.linkedin.com/in/harunslinked/)
     - Schedule a call with Harun [here](https://calendly.com/harunm28/30min)
- **Past Cohort**:
   1. **Alex**  
      - **Interview** : [Watch now](https://www.youtube.com/watch?v=U-cGNG3rzPg)  
      - **LinkedIn**  : [Alex's LinkedIn](https://www.linkedin.com/in/alex-seregin/)  
      - **Discord**   : alexeusgr

   2. **Bernand**  
      - **Interview** : [Watch now](https://www.youtube.com/watch?v=grbX5DAaW5Q)  
      - **LinkedIn**  : [Bernand's LinkedIn](https://www.linkedin.com/in/bernard-sibanda-954563243/)  
      - **Discord**   : wims5274

   3. **Suganya**  
      - **Interview** : [Watch now](https://www.youtube.com/watch?v=o8a6gTcE50w)  
      - **LinkedIn**  : [Suganya's LinkedIn](https://www.linkedin.com/in/suganya-raju/)  
      - **Discord**   : suganya1607

   4. **Udai**  
      - **Interview** : [Watch now](https://www.youtube.com/watch?v=UDXshRpVA6M)  
      - **LinkedIn**  : [Udai's LinkedIn](https://www.linkedin.com/in/solanki/)  
      - **Discord**   : thecoder0001
## Contact & Communication

- **GitHub Discussions**: [Developer-Experience Working Group Repository](https://github.com/IntersectMBO/developer-experience/discussions)
- **Discord Channel**: [OSC- Working Groups](https://discord.com/channels/1136727663583698984/1239886460266479696)
- **Email**: [Open Source Office](oso@intersectmbo.org)

## Running Developer Experience in Docker

The Developer Experience portal can be run entirely in Docker for consistent development across all platforms (Linux, macOS, Windows). This approach ensures all contributors work in the same environment with the same dependencies.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (2.0 or higher)

### Quick Start

#### Option 1: Using Docker Compose (Recommended)

**Development mode with hot reload:**
```bash
docker-compose up devex-dev
```
Access the site at [http://localhost:3000](http://localhost:3000). Changes to files in `website/` will automatically reload.

**Production build:**
```bash
docker-compose up devex-prod
```
Access the optimized production site at [http://localhost:8080](http://localhost:8080).

**Run tests:**
```bash
docker-compose --profile test up devex-test
```

#### Option 2: Using Docker CLI Directly

**Build the development image:**
```bash
docker build -t devex:dev --target development .
```

**Run development server:**
```bash
docker run -it --rm \
  -p 3000:3000 \
  -v "$(pwd)/website:/app:cached" \
  -v devex_node_modules:/app/node_modules \
  --name devex-dev \
  devex:dev
```

**Build the production image:**
```bash
docker build -t devex:prod --target production .
```

**Run production server:**
```bash
docker run -it --rm -p 8080:80 --name devex-prod devex:prod
```

### Docker Configuration Details

#### Multi-Stage Build Targets

The Dockerfile includes multiple stages optimized for different purposes:

- **`base`**: Base Node.js 18 Alpine image with system dependencies
- **`dependencies`**: Installs all Node.js dependencies
- **`development`**: Development server with hot reload support
- **`builder`**: Builds the static production site
- **`production`**: Nginx-based production runtime (minimal size)
- **`test`**: Test runner environment

#### Volume Mounting for Hot Reload

Development mode mounts your local `website/` directory into the container:
```yaml
volumes:
  - ./website:/app:cached              # Source code
  - node_modules:/app/node_modules     # Preserve node_modules
```

This enables live reloading when you edit files locally.

#### Port Mappings

- **3000**: Development server (hot reload)
- **8080**: Production server (Nginx)

### Common Docker Commands

#### View running containers:
```bash
docker-compose ps
```

#### Stop containers:
```bash
docker-compose down
```

#### Stop and remove volumes:
```bash
docker-compose down -v
```

#### View logs:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f devex-dev
```

#### Rebuild images after Dockerfile changes:
```bash
docker-compose build --no-cache
docker-compose up devex-dev
```

#### Execute commands inside running container:
```bash
# Interactive shell
docker-compose exec devex-dev sh

# Run a command
docker-compose exec devex-dev yarn typecheck
```

#### Clean up Docker resources:
```bash
# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Complete cleanup (careful!)
docker system prune -a --volumes
```

### Pushing to Docker Hub (Optional)

If you're a maintainer and want to share the image:

```bash
# Build and tag for Docker Hub
docker build -t intersectmbo/developer-experience:latest --target production .
docker build -t intersectmbo/developer-experience:dev --target development .

# Login to Docker Hub
docker login

# Push images
docker push intersectmbo/developer-experience:latest
docker push intersectmbo/developer-experience:dev

# Tag with version
docker tag intersectmbo/developer-experience:latest intersectmbo/developer-experience:v1.0.0
docker push intersectmbo/developer-experience:v1.0.0
```

### Troubleshooting

**Issue: Build fails with "502 Bad Gateway" or network timeout**
```bash
# The Dockerfile includes automatic retry logic with network timeouts
# If build still fails, try again after a few minutes
docker-compose build --no-cache devex-dev
```

**Issue: Changes not reflecting in development mode**
```bash
# Restart the container
docker-compose restart devex-dev

# Or rebuild if needed
docker-compose up --build devex-dev
```

**Issue: Port already in use**
```bash
# Change the port in docker-compose.yml
ports:
  - "3001:3000"  # Use different host port
```

**Issue: Permission errors on Linux**
```bash
# Fix ownership of generated files
sudo chown -R $USER:$USER website/
```

**Issue: Out of disk space**
```bash
# Clean up Docker resources
docker system prune -a --volumes
```

**Issue: Node modules not updating**
```bash
# Remove the volume and rebuild
docker-compose down -v
docker-compose up --build devex-dev
```

### Platform-Specific Notes

**Windows (WSL2):**
- Use WSL2 backend for better performance
- Clone repository inside WSL2 filesystem, not `/mnt/c/`
- Enable file sharing in Docker Desktop settings

**macOS:**
- Use `:cached` mount option (already configured) for better performance
- M1/M2 Macs: Docker will automatically use ARM images

**Linux:**
- May need to add user to docker group: `sudo usermod -aG docker $USER`
- Then logout and login again

### Environment Variables

You can customize behavior using environment variables in `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=development
  - CHOKIDAR_USEPOLLING=true    # Enable polling for file watching
  - FAST_REFRESH=true            # Enable React Fast Refresh
```

### Production Deployment

The production image is optimized and includes:
- Static site build with Docusaurus
- Nginx web server for efficient serving
- Gzip compression enabled
- Security headers configured
- Health checks configured
- Minimal image size (~50MB)

Deploy it to any container platform:
```bash
# Example: Deploy to cloud platform
docker tag devex:prod your-registry.com/devex:latest
docker push your-registry.com/devex:latest
```

### Docker Image Size Optimization

The multi-stage build produces efficient images:
- **Development**: ~600MB (includes dev dependencies)
- **Production**: ~50MB (Nginx + static files only)

## Contributing Guidelines
- Please checkout our [Contributing Documentation](./CONTRIBUTING.md).
- Read our Code of Conduct. 
- Check existing issues before creating new ones.
- Provide clear, detailed descriptions.
- Follow our template in `CONTRIBUTING.md` for issues and pull requests.
- Be respectful and constructive.

---

**Disclaimer**: This working group is community-driven and supported by Intersect MBO. We welcome contributions from all skill levels and backgrounds.


