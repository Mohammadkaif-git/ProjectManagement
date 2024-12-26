import { useAppSelector } from '@/app/redux';
import React, { useMemo, useState } from 'react'
import { useGetTasksQuery } from '@/state/api';
import { DisplayOption } from "gantt-task-react";
import { ViewMode } from "gantt-task-react";
import { Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

type TaskTypeItems = "task" | "milestone" | "project";

function TimelineView({ id, setIsModalNewTaskOpen }: Props) {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: "Month" as ViewMode,
    locale: "en-US",
  })

  const ganttTasks = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return [{
        start: new Date(),
        end: new Date(),
        name: "No tasks",
        id: "0",
        type: "task" as TaskTypeItems,
        progress: 0,
        isDisabled: true,
      }];
    }

    return tasks.map((task) => ({
      start: new Date(task.startDate || new Date()),
      end: new Date(task.dueDate || new Date()),
      name: task.title || "Untitled",
      id: `${task.id}`,
      type: "task" as TaskTypeItems,
      progress: task.points ? (task.points / 10) * 100 : 0,
      isDisabled: false,
    }));
  }, [tasks]);

  const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;
  return (
    <div className='px-4 xl:px-6'>
      <div className='flex flex-wrap items-center justify-between gap-2 py-2'>
        <h1 className='me-2 text-lg font-bold dark:text-white'>
          Project Task Timeline
        </h1>
        <div className='relative inline-block w-64'>
          <select className='focus:shadow-outline block w-full appearance-auto rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white'
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}>
              <option value={ViewMode.Day}>Day</option>
              <option value={ViewMode.Week}>Week</option>
              <option value={ViewMode.Month}>Month</option>
              <option value={ViewMode.Year}>Year</option>
          </select>

        </div>
      </div>

    <div className='overflow-hidden rounded-md bg-white dark:bg-dark-secondary dark:text-white'>
      <div className='timeline-view'>
        <Gantt
          tasks={ganttTasks}
          {...displayOptions}
          columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
          listCellWidth="100px"
          barBackgroundColor={isDarkMode ? "#101214" : "#aeb8c2"}
          barBackgroundSelectedColor={isDarkMode ? "#0000" : "#9ba1a6"}
        />
      </div>
      <div className='px-4 pb-5 pt-1'>
        <button className='flex items-center gap-2 rounded-md bg-blue-primary px-4 py-2 text-white hover:bg-blue-primary-600'
        onClick={() => setIsModalNewTaskOpen(true)}>
          Add new Task
        </button>
      </div>
    </div>
    </div>
  )
}

export default TimelineView;