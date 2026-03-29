type CharacterProfileProps = {
  name: string;
  tagline: string;
  traits: string[];
};

export function CharacterProfile({ name, tagline, traits }: CharacterProfileProps) {
  return (
    <article className="surface-panel rounded-panel p-8">
      <h1 className="text-3xl font-semibold capitalize text-foreground">{name}</h1>
      <p className="mt-2 text-muted">{tagline}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {traits.map((trait) => (
          <li key={trait} className="ui-chip px-3 py-1 text-xs">
            {trait}
          </li>
        ))}
      </ul>
    </article>
  );
}
