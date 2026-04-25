import { Navbar } from "@/components/Navbar";
import { projectsData } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Lightbulb, Target, Layers, CheckCircle2, TrendingUp, AlertTriangle, Rocket } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

// --- Components ---

const EditorialSection = ({
  title,
  content,
  align = "left",
  icon: Icon,
  delay = 0.2
}: {
  title: string,
  content: string,
  align?: "left" | "right",
  icon?: any,
  delay?: number
}) => {
  const isLeft = align === "left";

  return (
    <section className="container py-16 md:py-24 relative z-10">
      <div className={`max-w-4xl relative ${isLeft ? "mr-auto" : "ml-auto text-left"}`}>
        {/* Floating Depth Effect Background */}
        <div className="absolute -inset-6 -z-10 bg-gradient-to-br from-surface-container-high/20 to-transparent rounded-3xl blur-xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay }}
          className="relative z-10"
        >
          <div className="flex items-center gap-3 mb-6">
            {Icon && <Icon className="h-6 w-6 text-primary" />}
            <h2 className="text-sm uppercase tracking-[0.2em] text-primary font-bold">{title}</h2>
          </div>

          <div className="prose prose-invert prose-lg md:prose-xl max-w-none text-foreground/90 leading-relaxed font-light">
            {content.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-6">{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ImageGallery = ({ images, projectTitle }: { images: string[], projectTitle: string }) => {
  if (!images || images.length === 0) {
    return (
      <section className="container py-16 md:py-24">
        <Reveal>
          <div className="text-center py-16">
            <Layers className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">Visual Assets Coming Soon</h3>
            <p className="text-muted-foreground">Screenshots and diagrams will be added to showcase the project visually.</p>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section className="container py-16 md:py-24">
      <Reveal>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Visual Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[300px]">
          {images.map((img, i) => {
            const isWide = i === 0; // First image spans 2 columns

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group relative rounded-2xl overflow-hidden bg-surface-container-high border border-white/5 ${
                  isWide ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none">
                  <span className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-foreground">View Full</span>
                </div>
                <img
                  src={img}
                  alt={`${projectTitle} visual ${i + 1}`}
                  className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-high">
                        <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                          <Layers class="h-6 w-6 text-primary" />
                        </div>
                        <span class="text-sm font-medium text-muted-foreground">Image ${i + 1}</span>
                      </div>
                    `;
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
};

// --- Main Page ---

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const { details } = project;

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      <Navbar />

      <main className="relative pb-32">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-surface-container-low to-background" />

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <Link to="/projects" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Projects
              </Link>

              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
              >
                {project.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
              >
                {project.shortDescription}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded-full bg-surface-container-high/50 border border-white/5 text-foreground backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                {details.github && (
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:shadow-glow-soft hover:-translate-y-1 transition-all rounded-full px-8 h-12">
                    <a href={details.github} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-5 w-5" /> View Source
                    </a>
                  </Button>
                )}
                {details.demo && (
                  <Button asChild size="lg" variant="outline" className="bg-surface-container-high/50 backdrop-blur-sm border-white/10 hover:bg-surface-container-highest hover:-translate-y-1 transition-all rounded-full px-8 h-12 text-foreground">
                    <a href={details.demo} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-5 w-5" /> Live Demo
                    </a>
                  </Button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Story Flow - Following Reference Plan */}
        <div className="relative bg-background">
          <EditorialSection
            title="Overview"
            content={details.overview || "Project overview details coming soon..."}
            align="left"
            icon={Layers}
          />

          <EditorialSection
            title="Motivation"
            content={details.motivation || "Motivation details coming soon..."}
            align="right"
            icon={Lightbulb}
          />

          <EditorialSection
            title="The Problem"
            content={details.problem || "Problem statement coming soon..."}
            align="left"
            icon={Target}
          />

          <EditorialSection
            title="The Solution"
            content={details.solution || "Solution approach coming soon..."}
            align="right"
            icon={CheckCircle2}
          />

          <EditorialSection
            title="Technical Deep Dive"
            content={details.architecture || "Technical architecture details coming soon..."}
            align="left"
            icon={Layers}
          />

          {/* Visual Gallery */}
          <ImageGallery images={details.images} projectTitle={project.title} />

          <EditorialSection
            title="Results & Impact"
            content={details.results || "Results and impact metrics coming soon..."}
            align="right"
            icon={TrendingUp}
          />

          <EditorialSection
            title="Challenges Faced"
            content={details.challenges || "Challenges and solutions coming soon..."}
            align="left"
            icon={AlertTriangle}
          />

          <EditorialSection
            title="Future Scope"
            content={details.futureScope || "Future improvements and scope coming soon..."}
            align="right"
            icon={Rocket}
          />
        </div>

        {/* Footer CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container py-24 text-center relative z-20"
        >
          <div className="w-px h-24 bg-gradient-to-b from-primary/50 to-transparent mx-auto mb-12" />

          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">Explore More Projects</h2>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:shadow-glow-soft hover:-translate-y-1 transition-all rounded-full px-8 h-12">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-5 w-5" /> Back to Projects
              </Link>
            </Button>
            {details.github && (
              <Button asChild size="lg" variant="secondary" className="bg-surface-container border-white/10 hover:bg-surface-container-high hover:-translate-y-1 transition-all rounded-full px-8 h-12 text-foreground">
                <a href={details.github} target="_blank" rel="noreferrer">
                  View Repository
                </a>
              </Button>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default ProjectDetailPage;