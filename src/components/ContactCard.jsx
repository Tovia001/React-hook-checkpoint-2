function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      <img
        src={contact.image}
        alt={contact.fullName}
        className="contact-image"
      />

      <h3>{contact.fullName}</h3>

      <p>{contact.email}</p>

      <p>{contact.phoneNumber}</p>

      <button onClick={() => onEdit(contact)}>
        Edit
      </button>

      <button onClick={() => onDelete(contact.id)}>
        Delete
      </button>
    </div>
  );
}

export default ContactCard;