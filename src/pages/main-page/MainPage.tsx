import { useState } from "react";
import { OfferCreatedModal } from "../../widgets/modals/OfferCreatedModal";

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <h1>Главная страница</h1>
      <button type="button" onClick={() => setIsOpen(true)}>
        Открыть модалку
      </button>

      <OfferCreatedModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
       />
    </div>
  );
}
