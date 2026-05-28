const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const links = [
  { label: "PDF", href: `${basePath}/assets/conreg-paper.pdf` },
  { label: "arXiv", href: "http://arxiv.org/abs/2605.21398" },
  { label: "Video", href: "https://youtu.be/LNErWbkF8kc" },
  { label: "BibTeX", href: "#citation" }
];

const authors = [
  {
    name: "Chen Chen",
    affiliation: "Department of Automation, Tsinghua University"
  },
  {
    name: "Yunwen Li",
    affiliation: "Tsingscribe Medical Ltd.; D-MAVT, ETH Zurich"
  },
  {
    name: "Yifan Xu",
    affiliation: "Department of Automation, Tsinghua University"
  },
  {
    name: "Xiangjie Yan",
    affiliation: "Department of Automation, Tsinghua University"
  },
  {
    name: "Chang Shu",
    affiliation: "Peking University School and Hospital of Stomatology"
  },
  {
    name: "Jianxia Hou",
    affiliation: "Peking University School and Hospital of Stomatology"
  },
  {
    name: "Shiji Song",
    affiliation: "Department of Automation, Tsinghua University"
  },
  {
    name: "Xiang Li",
    affiliation: "Department of Automation, Tsinghua University"
  }
];

const metrics = [
  { value: "0.031 mm", label: "mean simulation translation error" },
  { value: "0.325 deg", label: "mean simulation rotation error" },
  { value: "0.42 mm", label: "real-world execution translation error" },
  { value: "3.75 deg", label: "real-world execution rotation error" }
];

const contributions = [
  {
    index: "01",
    title: "Complementary-shape Docking",
    text:
      "Contact registration is reformulated as docking between the object model and the probe's swept volume, explicitly encoding probe geometry instead of relying on fragile point correspondences."
  },
  {
    index: "02",
    title: "Global-to-local Search",
    text:
      "FFT-based translation correlation is coupled with low-discrepancy orientation sampling to search SE(3) efficiently and produce robust initial hypotheses."
  },
  {
    index: "03",
    title: "Continuous SE(3) Refinement",
    text:
      "A Lie-algebraic optimization with analytic contact sensitivities refines the pose continuously for metric-grade convergence."
  }
];

const methodStages = [
  {
    index: "A",
    title: "Global Grid Search",
    text:
      "The object and swept probe volume are voxelized, and 3D FFT correlation evaluates translations for globally sampled SO(3) orientations."
  },
  {
    index: "B",
    title: "Local Orientation Search",
    text:
      "The best coarse orientation is refined inside a geodesic ball on SO(3) with a low-discrepancy GeoBall-SF sampler."
  },
  {
    index: "C",
    title: "Continuous Optimization",
    text:
      "Starting from the discrete hypothesis, a bounded SE(3) optimization maximizes smooth contact proximity while penalizing penetration."
  }
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
          <p className="authors">
            {authors.map((author, index) => (
              <span key={author.name}>
                <span className="authorName" title={author.affiliation}>
                  {author.name}
                </span>
                {index < authors.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
          <div className="actions" aria-label="Project links">
            {links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="heroVisual" aria-label="Project overview figures">
          <img
            className="heroFigure"
            src={`${basePath}/assets/trailer.svg`}
            alt="Tooth preparation robot and swept contact registration illustration"
          />
          <img
            className="heroAbstract"
            src={`${basePath}/assets/graphical_abstract.svg`}
            alt="Graphical abstract of probe-aware complementary-shape docking"
          />
        </div>
      </section>

      <section className="section twoCol">
        <div>
          <h2>Contact Registration Without External Tracking</h2>
          <p>
            Precise alignment between a prior object model and the real scene is
            essential for surgical robots, precision assembly, and other
            manipulation tasks where small pose errors directly affect execution.
            Optical registration can be accurate, but it also introduces
            line-of-sight constraints, hand-eye calibration, marker fabrication,
            and mounting errors.
          </p>
          <p>
            This work uses the robot's own contact trajectory instead. By
            modeling the full swept volume of a rigid probe, the method turns
            sparse and intermittent contact into dense geometric constraints
            that combine contact and free-space evidence.
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

      <section className="section">
        <h2>Contributions</h2>
        <div className="pillars">
          {contributions.map((item) => (
            <article key={item.title}>
              <span>{item.index}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
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
        <div className="figureScroller" aria-label="Method pipeline figure">
          <img
            className="wideFigure"
            src={`${basePath}/assets/pipeline.svg`}
            alt="Pipeline from swept probe observations to global search and SE(3) refinement"
          />
        </div>
        <div className="pillars">
          {methodStages.map((stage) => (
            <article key={stage.title}>
              <span>{stage.index}</span>
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section twoCol">
        <div>
          <h2>Results</h2>
          <p>
            In simulation across five free-form meshes, the final refinement
            stage reached 0.031 mm and 0.325 deg mean error and remained stable
            under practical pose noise and sparse contact. On the real
            tooth-preparation robot, the complete registration-to-execution
            pipeline achieved 0.42 mm and 3.75 deg execution error while avoiding
            the calibration-chain failures observed with optical tracking.
          </p>
        </div>
        <div className="callout">
          <p>
            The practical advantage is a calibration-free strategy that requires
            neither external sensors nor careful initialization, only manipulator
            proprioception and the known probe geometry.
          </p>
        </div>
      </section>

      <section className="figureGrid section">
        {resultFigures.map((figure) => (
          <article className={figure.wide ? "figureWide" : undefined} key={figure.src}>
            <div className={figure.wide ? "figureScroller" : undefined}>
              <img
                src={`${basePath}/assets/${figure.src}`}
                alt={figure.title}
              />
            </div>
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
