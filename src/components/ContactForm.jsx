import { useState, useEffect } from "react";

function ContactForm({ onAddContact, editingContact, onUpdateContact, onCancelEdit }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editingContact) {
      setFullName(editingContact.fullName);
      setEmail(editingContact.email);
      setPhoneNumber(editingContact.phoneNumber);
      setImage(editingContact.image);
    }
  }, [editingContact]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName.trim() || !email.trim()) {
      alert("Name and email are required!");
      return;
    }

    const contactData = {
      fullName,
      email,
      phoneNumber,
      image: image || "https://via.placeholder.com/100"
    };

    if (editingContact) {
      onUpdateContact(editingContact.id, contactData);
    } else {
      onAddContact(contactData);
    }

    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setImage("");
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>{editingContact ? "Edit Contact" : "Add New Contact"}</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button type="submit">
        {editingContact ? "Update Contact" : "Add Contact"}
      </button>

      {editingContact && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default ContactForm;