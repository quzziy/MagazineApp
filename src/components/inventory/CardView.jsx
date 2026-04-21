import { MagazineCard } from './MagazineCard';

export function CardView({ magazines, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {magazines.map((mag) => (
        <MagazineCard
          key={mag.id}
          magazine={mag}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
