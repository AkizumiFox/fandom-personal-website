type CostumeSpecCardProps = {
  title: string;
  specs: Array<{ label: string; value: string }>;
};

export function CostumeSpecCard({ title, specs }: CostumeSpecCardProps) {
  return (
    <section className="surface-panel rounded-panel p-6">
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <dl className="mt-4 space-y-2 text-sm">
        {specs.map((spec) => (
          <div key={spec.label} className="grid grid-cols-2 gap-4">
            <dt className="text-muted">{spec.label}</dt>
            <dd>{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
