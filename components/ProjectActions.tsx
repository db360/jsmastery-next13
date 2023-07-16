"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react";

const ProjectActions = ({ projectId}: {projectId: string}) => {

const [isDeleting, setIsDeleting] = useState(false);
const deleteProject = async() => {

}

  return (
    <>
        <Link
            href={`/edit-project/${projectId }`}
            className="flexCenter edit-action_btn"
        >
            <Image
                src="/pencil.svg"
                width={15}
                height={15}
                alt="edit"
            />
        </Link>
        <button
            type="button"
            className={`flexCenter delete-action_btn ${isDeleting
            ? 'bg-gray' : 'bg-primary-purple'}`}
        >
        <Image
                src="/trash.svg"
                width={15}
                height={15}
                alt="delete"
            />
        </button>
    </>
  )
}

export default ProjectActions