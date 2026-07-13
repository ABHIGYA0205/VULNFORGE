type Props = {
  technologies: string[];
};

export default function TechnologiesCard({
  technologies,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-xl font-semibold text-white">
        Technologies
      </h2>

      {technologies.length === 0 ? (
        <p className="text-zinc-400">
          No technologies detected.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">

          {technologies.map((tech,index) => (
            <span
              key={`${tech}-${index}`}
              className="rounded-lg border border-green-700 bg-green-900/30 px-4 py-2 text-green-400"
            >
              
              {tech}
            </span>
          ))}

        </div>
      )}

    </div>
  );
}