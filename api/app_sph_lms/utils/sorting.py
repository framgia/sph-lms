class SortingOption:
    sorting_options = {
        "A - Z": ("firstname", False),
        "Z - A": ("firstname", True),
        "Progress Asc": ("progress", False),
        "Progress Desc": ("progress", True),
    }

    @classmethod
    def get_sort_key(self, sorting_option):
        if sorting_option in self.sorting_options:
            return self.sorting_options[sorting_option][0]
        return None

    @classmethod
    def get_reverse_flag(self, sorting_option):
        if sorting_option in self.sorting_options:
            return self.sorting_options[sorting_option][1]
        return False
