const useCourseApi = (): any => {
  useEffect(() => {
    async function fetchdata (): Promise<void> {
      try {
        const response = await api.get<CourseProps[]>(
              `course/?ordering=${sortDirection === ASC ? 'title' : '-title'}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    void fetchdata();
  });
};

export default useCourseApi;
