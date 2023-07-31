<template>
  <div>
    <h2 class="header">Customer Details List</h2>
    <ul class="item-list">
    <div class="item-list-container">
      
    <!--  Button Add New Item -->
    <button @click="showAddPopup = true" class="add-item-button">Add New</button>
    
      <!-- Header -->
      <li class="item item-header">
        <span class="item-name-header">Name</span>
        <span class="item-age-header">Age</span>
        <span class="item-profession-header">Profession</span>
        <span class="item-gmail-header">Gmail</span>
        <div class="item-buttons"></div>
      </li>

      <!-- Display Customers Details -->
      <li v-for="(item, index) in items" :key="item.id" class="item">
        <span class="item-name">{{ item.firstName }} {{ item.lastName }}</span>
        <span class="item-age">{{ item.age }}</span>
        <span class="item-profession">{{ item.profession }}</span>
        <span class="item-gmail">{{ item.gmail }}</span>
        <div class="item-buttons">
          
          <!-- Edit Customer Button -->
          <button @click="openPopup(index)" class="edit-button">Edit</button>
          
          <!-- Delete Customer Button -->
          <button @click="deleteItem(item.id)" class="delete-button">Delete</button>
        </div>
      </li>
      </div>
    </ul>

    <!-- Create a new Popup -->
      <div v-if="showAddPopup" class="popup">
        <div class="popup-content">
          <h3>Add Customers</h3>
          <form @submit.prevent="addItem">
            <div class="form-group">
              <label for="firstName">First Name:</label>
              <input v-model="newItem.firstName" type="text" id="firstName" required />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name:</label>
              <input v-model="newItem.lastName" type="text" id="lastName" required />
            </div>
            <div class="form-group">
              <label for="age">Age:</label>
              <input v-model.number="newItem.age" type="number" id="age" required />
            </div>
            <div class="form-group">
              <label for="profession">Profession:</label>
              <input v-model="newItem.profession" type="text" id="profession" required />
            </div>
            <div class="form-group">
              <label for="gmail">Gmail:</label>
              <input v-model="newItem.gmail" type="email" id="gmail" required />
            </div>
            <div class="form-group buttons">
              <button type="submit">Add Item</button>
              <button type="button" @click="closePopup">Done</button>
            </div>
          </form>
        </div>
      </div>

    <!-- Update Details Popup -->
    <div v-if="showEditPopup" class="popup">
      <div class="popup-content">
        <h3>Edit Item Details</h3>
        <form>
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input v-model="editedItem.firstName" type="text" id="firstName" required />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name:</label>
            <input v-model="editedItem.lastName" type="text" id="lastName" required />
          </div>
          <div class="form-group">
            <label for="age">Age:</label>
            <input v-model.number="editedItem.age" type="number" id="age" required />
          </div>
          <div class="form-group">
            <label for="profession">Profession:</label>
            <input v-model="editedItem.profession" type="text" id="profession" required />
          </div>
          <div class="form-group">
            <label for="gmail">Gmail:</label>
            <input v-model="editedItem.gmail" type="email" id="gmail" required />
          </div>
          <div class="form-group buttons">
            <button type="button" @click="updateItem">Done</button>
            <button type="button" @click="closePopup">Cancel</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import api from '/src/api';

export default {
  data() {
    return {
      items: [],
      showEditPopup: false,
      showAddPopup:false,
      editedIndex: null,
      editedItem: {},
      newItem: { firstName: '', lastName: '', age: null, profession: '', gmail: '' },
      error: null,
    };
  },
  methods: {
    openPopup(index) {
      this.editedIndex = index;
      this.editedItem = { ...this.items[index] };
      this.showEditPopup = true;
    },

    closePopup() {
      this.editedIndex = null;
      this.showEditPopup = false;
      this.showAddPopup = false;
    },
    resetForm() {
      // Reset the newItem object to clear the form fields
      this.newItem = { firstName: '', lastName: '', age: null, profession: '', gmail: '' };
      // Close the "Create New Item" popup
      this.showEditPopup = false;
    },

    async updateItem() {
      try {
        const response = await api.updateItem(this.editedItem.id, this.editedItem);
        const updatedItem = response.data;
        this.items.splice(this.editedIndex, 1, updatedItem);
        this.closePopup();
      } catch (error) {
        console.error('Error updating item:', error);
        this.error = 'Error updating item. Please try again later.';
      }
    },

    async fetchItems() {
      try {
        const response = await api.getAllItems();
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
        this.error = 'Error fetching items. Please try again later.';
      }
    },

    async addItem() {
      try {
        const response = await api.createItem(this.newItem);
        this.items.push(response.data);
        this.newItem = { firstName: '', lastName: '', age: null, profession: '', gmail: '' };
      } catch (error) {
        console.error('Error adding item:', error);
        this.error = 'Error adding item. Please try again later.';
      }
    },

    async deleteItem(itemId) {
      console.log(itemId);
      try {
        await api.deleteItem(itemId);
        this.items = this.items.filter((item) => item.id !== itemId);
      } catch (error) {
        console.error('Error deleting item:', error);
        this.error = 'Error deleting item. Please try again later.';
      }
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<!-- Call Template CSS -->
<style src="@/assets/css/template.css"></style>
