from library_item import LibraryItem

class Library:
    """Class untuk mengelola koleksi item perpustakaan"""
    
    def __init__(self, name):
        self.__name = name
        self.__items = []
    
    @property
    def name(self):
        return self.__name
    
    @property
    def item_count(self):
        return len(self.__items)
    
    def add_item(self, item):
        """Menambahkan item ke perpustakaan"""
        if isinstance(item, LibraryItem):
            self.__items.append(item)
            return True
        return False
    
    def remove_item_by_id(self, item_id):
        """Menghapus item berdasarkan ID"""
        for i, item in enumerate(self.__items):
            if item.id == item_id:
                del self.__items[i]
                return True
        return False
    
    def remove_item_by_title(self, title):
        """Menghapus item berdasarkan judul"""
        for i, item in enumerate(self.__items):
            if item.title.lower() == title.lower():
                del self.__items[i]
                return True
        return False
    
    def search_by_id(self, item_id):
        """Mencari item berdasarkan ID"""
        for item in self.__items:
            if item.id == item_id:
                return item
        return None
    
    def search_by_title(self, title):
        """Mencari item berdasarkan judul"""
        results = []
        for item in self.__items:
            if title.lower() in item.title.lower():
                results.append(item)
        return results
    
    def display_all_items(self):
        """Menampilkan semua item di perpustakaan"""
        if not self.__items:
            return "Perpustakaan kosong."
        
        result = f"Daftar Item di {self.__name} (Total: {self.item_count}):\n"
        for i, item in enumerate(self.__items, 1):
            result += f"{i}. {item}\n"
        return result
    
    def filter_by_type(self, item_type=None):
        """Filter item berdasarkan tipe"""
        if item_type is None or item_type.lower() == "all":
            return self.__items
        
        filtered_items = []
        for item in self.__items:
            if item.get_item_type().lower() == item_type.lower():
                filtered_items.append(item)
        return filtered_items