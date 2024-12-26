"use client";

import { useState } from 'react';
import ProjectHeader from '../ProjectHeader';
import BoardView from '../BoardView';
import ListView from '../ListView';
import { useParams } from 'next/navigation';

const ProjectPage = () => {
    const params = useParams();
    const projectId = params.id as string;
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

    console.log('Current Project ID:', projectId); // Debug log

    const renderView = () => {
        switch (activeTab) {
            case "Board":
                return <BoardView id={projectId} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />;
            case "List":
                return <ListView id={projectId} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />;
            case "Timeline":
                return <div>Timeline View Coming Soon</div>;
            case "Table":
                return <div>Table View Coming Soon</div>;
            default:
                return <BoardView id={projectId} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />;
        }
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-dark-bg">
            <ProjectHeader 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
            />
            <div className="p-6">
                {renderView()}
            </div>
        </div>
    );
};

export default ProjectPage; 