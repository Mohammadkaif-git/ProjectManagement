"use client";

import { useParams } from 'next/navigation';

const ProjectPage = () => {
    const params = useParams();
    const projectId = params.id;

    return (
        <div>
            <h1>Project {projectId}</h1>
        </div>
    );
};

export default ProjectPage; 