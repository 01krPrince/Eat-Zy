import api from "../api/axios.js";

const ItemService = {

  // ================= PROVIDER ACTIONS =================

  /**
   * Create a new item (not linked to any menu initially)
   * Path: POST /items
   * @param {Object} itemData - ItemCreateRequestDTO
   */
  createItem: async (itemData) => {
    try {
      const payload = {
        ...itemData,
        tags: Array.isArray(itemData.tags)
          ? itemData.tags
          : itemData.tags?.split(",")
              .map(tag => tag.trim())
              .filter(Boolean) || []
      };

      const response = await api.post("/items", payload);
      return response.data;

    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Update item details
   * Path: PUT /items/{itemId}
   */
  updateItem: async (itemId, updateData) => {
    try {
      const response = await api.put(`/items/${itemId}`, updateData);
      return response.data;

    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Assign item to a menu
   * Path: PATCH /items/{itemId}/assign-menu/{menuId}
   */
  assignItemToMenu: async (itemId, menuId) => {
    try {
      const response = await api.patch(
        `/items/${itemId}/assign-menu/${menuId}`
      );
      return response.data;

    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  /**
   * Remove item from a menu
   * Path: PATCH /items/{itemId}/remove-menu/{menuId}
   */
  removeItemFromMenu: async (itemId, menuId) => {
    try {
      const response = await api.patch(
        `/items/${itemId}/remove-menu/${menuId}`
      );
      return response.data;

    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // ================= PUBLIC =================

  /**
   * Get items by menu (customer view)
   * Path: GET /items/public/menu/{menuId}
   */
  getItemsByMenu: async (menuId) => {
    try {
      const response = await api.get(`/items/public/menu/${menuId}`);
      return response.data;

    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default ItemService;
