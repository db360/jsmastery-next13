'use client';

import { SessionInterface } from "@/common.types"
import Image from "next/image";
import { ChangeEvent } from "react";
import FormField from "./FormField";
import { categoryFilters } from "@/constants";

type Props = {
    type: string,
    session: SessionInterface
}

const ProjectForm = ({ type, session} : Props) => {

    const handleFormSubmit = (e: React.FormEvent) => {

    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {

    }

    const handleStateChange = (fieldName : string, value: string) => {

    }

    const form = {
      image: '',
      title: '',

    };

  return (
    <form
        onSubmit={handleFormSubmit}
        className="flexStart form"
    >
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          type="file"
          id="image"
          accept="image/*" // Tod-os los tipos de imágenes
          required={type === 'create'} // si el tipo es create
          onChange={handleChangeImage}
          className="form_image-input"
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project Poster"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects"
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://dabmartinez.com"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com/db360"
        setState={(value) => handleStateChange('githubUrl', value)}
      />
      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />

      {/* CustomInput Category...*/}
      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        

      />

      <div className="flexStart w-full">
        <button>Create</button>
      </div>

    </form>
  )
}

export default ProjectForm