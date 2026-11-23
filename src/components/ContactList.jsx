import ContactCard from "./ContactCard";

function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          contact={contact}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ContactList;