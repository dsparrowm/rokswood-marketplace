import { ResourceIcon } from "@/components/product/product-icons";
import type { ProductResource } from "@/types/product";

type EngineeringResourcesProps = {
  resources: ProductResource[];
};

export default function EngineeringResources({ resources }: EngineeringResourcesProps) {
  return (
    <section className="mx-auto max-w-[1360px] border-t border-[var(--border-default)] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
      <h2 className="text-center text-2xl font-bold text-[var(--text-primary)]">Engineering Resources</h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {resources.map((resource) => (
          <article
            key={resource.title}
            className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-7 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-base)]">
              <ResourceIcon icon={resource.icon} />
            </div>
            <h3 className="mt-6 text-base font-bold text-[var(--text-primary)]">{resource.title}</h3>
            <p className="mt-5 text-xs leading-5 text-[var(--text-light)]">{resource.description}</p>
            <button
              type="button"
              className="mt-5 border-b border-[var(--text-primary)] text-sm font-bold text-[var(--text-primary)]"
            >
              {resource.actionLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
