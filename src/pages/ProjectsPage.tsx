import { Navbar } from "@/components/Navbar";
import { projectsData } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProjectsPage = () => {
  const allProjects = projectsData.filter(p => p.visible);
  const featuredProjects = allProjects.filter(p => p.featured);
  const otherProjects = allProjects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container pt-32 pb-16 md:pt-40 md:pb-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Link to="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Home
          </Link>

          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">All Projects</h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A comprehensive showcase of my work in AI, systems engineering, and full-stack development.
            Each project represents a unique challenge and innovative solution.
          </p>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-20">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Featured Work</h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, i) => (
                <Reveal key={project.id} delay={i * 100}>
                  <Link to={`/projects/${project.id}`} className="block group">
                    <motion.article
                      className="bg-surface-container-low rounded-2xl p-8 h-full transition-all duration-500 hover:bg-surface-container hover:-translate-y-2 hover:shadow-glow-soft"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1 pr-4">
                          <h3 className="font-display text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                            {project.shortDescription}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <ArrowUpRight className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span key={tech} className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full bg-surface-container-high text-foreground border border-white/5">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Click to explore the full case study →
                      </div>
                    </motion.article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* All Projects Grid */}
        <section>
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              {featuredProjects.length > 0 ? "More Projects" : "All Projects"}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, i) => {
              const displayedTech = project.techStack.slice(0, 3);
              const remainingTechCount = project.techStack.length - 3;

              return (
                <Reveal key={project.id} delay={i * 100}>
                  <Link to={`/projects/${project.id}`} className="block group h-full">
                    <motion.article
                      className="bg-surface-container-low rounded-2xl p-6 h-full transition-all duration-500 hover:bg-surface-container hover:-translate-y-1 hover:shadow-glow-soft"
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-surface-container-highest group-hover:bg-primary/20 transition-colors">
                          <ArrowUpRight className="h-4 w-4 text-primary" />
                        </div>
                      </div>

                      <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-grow leading-relaxed line-clamp-3">
                        {project.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {displayedTech.map((tech) => (
                          <span key={tech} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-surface-container-high text-muted-foreground border-none">
                            {tech}
                          </span>
                        ))}
                        {remainingTechCount > 0 && (
                          <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
                            +{remainingTechCount}
                          </span>
                        )}
                      </div>
                    </motion.article>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-20"
        >
          <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent mx-auto mb-8" />
          <h3 className="font-display text-2xl font-bold mb-4">Interested in collaboration?</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Each project represents a unique challenge solved with innovative technology.
            Let's discuss how we can build something amazing together.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:shadow-glow-soft hover:-translate-y-1 transition-all">
            <Link to="/#contact">
              Get In Touch
            </Link>
          </Button>
        </motion.section>
      </main>
    </div>
  );
};

export default ProjectsPage;