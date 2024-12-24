"use client";

import { useState } from 'react';
import ProjectHeader from './ProjectHeader';
import BoardView from './BoardView';

type Params = {
    params:{
        id:string;
    }
}    
const ProjectsPage = ({params}:Params) => {
    const{id}=params;
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-dark-bg">
            <ProjectHeader 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
            />
            <BoardView id={activeTab} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        </div>
    );
};

export default ProjectsPage;
