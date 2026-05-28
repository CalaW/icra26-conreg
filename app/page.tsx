const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const links = [
  { label: "PDF", href: `${basePath}/assets/conreg-paper.pdf` },
  { label: "arXiv", href: "http://arxiv.org/abs/2605.21398" },
  { label: "Video", href: "https://youtu.be/LNErWbkF8kc" },
  { label: "BibTeX", href: "#citation" }
];

const authors = [
  "Chen Chen",
  "Yunwen Li",
  "Yifan Xu",
  "Xiangjie Yan",
  "Chang Shu",
  "Jianxia Hou",
  "Shiji Song",
  "Xiang Li"
];

const metrics = [
  { value: "0.031 mm", label: "mean simulation translation error" },
  { value: "0.325 deg", label: "mean simulation rotation error" },
  { value: "0.42 mm", label: "robot registration error" },
  { value: "3.75 deg", label: "robot orientation error" }
];

const resultFigures = [
  {
    src: "sim-overview.svg",
    title: "Simulation objects",
    text: "Five free-form meshes with cylindrical probe sweep trajectories.",
    wide: true
  },
  {
    src: "noise-plot.svg",
    title: "Noise robustness",
    text: "Stable registration under practical Gaussian pose noise."
  },
  {
    src: "sparse-contact.svg",
    title: "Sparse contact",
    text: "Reliable results even when most trajectory points are non-contact."
  },
  {
    src: "mesh-error.svg",
    title: "Mesh analysis",
    text: "Prepared tooth geometry closely follows the designed preparation."
  },
  {
    src: "ndi-vs-ours.svg",
    title: "Robot comparison",
    text: "The contact-based result avoids the optical calibration-chain failure."
  }
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="heroInner">
          <p className="venue">IEEE ICRA 2026</p>
          <h1>From Swept Contact to Pose</h1>
          <p className="subtitle">
            Probe-aware registration via complementary-shape docking
          </p>
          <p className="authors">{authors.join(" · ")}</p>
          <p className="affiliations">
            Tsinghua University · Tsingscribe Medical Ltd. · ETH Zurich ·
            Peking University School and Hospital of Stomatology
          </p>
          <div className="actions" aria-label="Project links">
            {links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <img
          className="heroFigure"
          src={`${basePath}/assets/trailer.svg`}
          alt="Tooth preparation robot and swept contact registration illustration"
        />
      </section>

      <section className="section twoCol">
        <div>
          <h2>Contact Registration Without External Tracking</h2>
          <p>
            Accurate alignment between a prior object model and the real scene
            is critical for high-precision robotic manipulation. Instead of
            relying on optical tracking, long calibration chains, or fragile
            point correspondences, this work treats the problem as
            complementary-shape docking between the object and the swept volume
            of a physical probe.
          </p>
          <p>
            The formulation uses both contact and non-contact evidence and
            explicitly models probe geometry. A global-to-local search explores
            pose hypotheses with 3D FFT correlation over SO(3) samples, then
            refines the result continuously in SE(3) with analytic contact
            sensitivities.
          </p>
        </div>
        <div className="metricGrid" aria-label="Key results">
          {metrics.map((metric) => (
            <div className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mediaBand">
        <div className="videoWrap">
          <iframe
            src="https://www.youtube.com/embed/LNErWbkF8kc"
            title="Project video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <section className="section">
        <h2>Method</h2>
        <img
          className="wideFigure"
          src={`${basePath}/assets/pipeline.svg`}
          alt="Pipeline from swept probe observations to global search and SE(3) refinement"
        />
        <div className="pillars">
          <article>
            <span>01</span>
            <h3>Probe-aware Evidence</h3>
            <p>
              Contacts are interpreted through the swept volume of the probe,
              while free-space observations constrain where object surface cannot
              be.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Complementary Docking</h3>
            <p>
              Registration becomes a shape matching problem between the object
              model and the probe-induced complementary volume.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Global-to-local Pose Search</h3>
            <p>
              Low-discrepancy SO(3) sampling and 3D FFT correlation provide
              broad exploration before Lie-algebra SE(3) refinement.
            </p>
          </article>
        </div>
      </section>

      <section className="section twoCol">
        <div>
          <h2>Results</h2>
          <p>
            In simulation over free-form meshes, the method reaches metric-grade
            accuracy and remains robust under pose noise and contact loss. On a
            tooth-preparation robot, it achieves 0.42 mm and 3.75 deg error,
            outperforming an optical-tracker registration setup without
            requiring external sensors.
          </p>
        </div>
        <div className="callout">
          <p>
            The key practical advantage is a calibration-free registration
            strategy that uses the robot's own contact interaction as the sensing
            signal.
          </p>
        </div>
      </section>

      <section className="figureGrid section">
        {resultFigures.map((figure) => (
          <article className={figure.wide ? "figureWide" : undefined} key={figure.src}>
            <img
              src={`${basePath}/assets/${figure.src}`}
              alt={figure.title}
            />
            <h3>{figure.title}</h3>
            <p>{figure.text}</p>
          </article>
        ))}
      </section>

      <section className="section" id="citation">
        <h2>Citation</h2>
        <pre>{`@misc{chen2026swept,
  title={From swept contact to pose: Probe-aware registration via complementary-shape docking},
  author={Chen, Chen and Li, Yunwen and Xu, Yifan and Yan, Xiangjie and Shu, Chang and Hou, Jianxia and Song, Shiji and Li, Xiang},
  year={2026},
  eprint={2605.21398},
  archivePrefix={arXiv},
  primaryClass={cs.RO}
}`}</pre>
      </section>

      <footer>
        <span>Probe-aware Registration</span>
        <a href="http://arxiv.org/abs/2605.21398">arXiv:2605.21398</a>
      </footer>
    </main>
  );
}
