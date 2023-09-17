import mongoose from 'mongoose';

const admin = new mongoose.Schema({
  name: String,
  password: String,
});

const AdminModal = mongoose.model('Admin', admin);

export default AdminModal;