import Contact from '../models/contactModel.js';

export const getAllContacts = async (
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
  filter = {}
) => {
  try {
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const skip = (page - 1) * perPage;

    const query = { ...filter, userId };

    const contactsPromise = Contact.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(perPage);

    const totalItemsPromise = Contact.countDocuments(query);

    const [contacts, totalItems] = await Promise.all([
      contactsPromise,
      totalItemsPromise,
    ]);

    return { contacts, totalItems };
  } catch (err) {
    console.error('Error fetching contacts:', err);
    throw new Error('Error fetching contacts');
  }
};

export const getContactByIdService = async (contactId, userId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId, userId });
    return contact;
  } catch {
    throw new Error('Error fetching contact by id');
  }
};

export const createContactService = async (contactData) => {
  const newContact = await Contact.create(contactData);
  return newContact;
};


export const patchContactService = async (contactId, updateData, userId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    { new: true }
  );
  return updatedContact;
};

export const deleteContactService = async (contactId, userId) => {
  const deletedContact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return deletedContact;
};
