import math


class ProgressCalculator:
    def __init__(self, completed_lessons, total_lessons):
        self.completed_lessons = completed_lessons
        self.total_lessons = total_lessons

    def get_percentage(self):
        if self.total_lessons > 0:
            progress_percentage = (self.completed_lessons / self.total_lessons) * 100
        else:
            progress_percentage = 0
        return math.floor(progress_percentage)
