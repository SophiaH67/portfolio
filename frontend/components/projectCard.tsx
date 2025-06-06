import { faBan, faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import ProjectInterface from '../interfaces/project'
import { deleteProject } from '../lib/api'
import TextareaAutosize from 'react-textarea-autosize'

interface Props extends ProjectInterface {
  editing?: boolean
  onDelete?: () => void
  onEdit?: () => void
  onSave?: (name: string, description_en: string, link: string) => void
  className?: string
}

export default function ProjectCard({
  className,
  id,
  name: initialName,
  description_en: initialdescription_en,
  link: initialLink,
  editing,
  onDelete,
  onEdit,
  onSave,
}: Props) {
  const [name, setName] = useState(initialName)
  const [description_en, setdescription_en] = useState(initialdescription_en)
  const [link, setLink] = useState(initialLink)

  if (typeof description_en == 'undefined' || typeof name == 'undefined' || typeof link == 'undefined')
    return <></>

  return (
    <div
      className={
        'w-full md:w-96 md:max-w-xl bg-white shadow-xl rounded-lg break-words flex flex-col justify-between ' +
          className || ''
      }
    >
      <div className='pt-6 px-3 pb-4'>
        {editing ? (
          <TextareaAutosize
            className='text-4xl text-gray-800 w-full outline-none resize-none overflow-hidden'
            placeholder={initialName}
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
        ) : (
          <h2 className='text-4xl text-gray-800 w-full'>{name}</h2>
        )}
        {editing ? (
          <>
            <label className='font-light text-gray-500 text-xs'>English</label>
            <TextareaAutosize
              className='text-black w-full resize-none h-full outline-none'
              value={description_en}
              placeholder={initialdescription_en}
              onInput={(e) => {
                const targetElement = e.target as HTMLTextAreaElement
                setdescription_en(targetElement.value)
              }}
            />
          </>
        ) : (
          <p className='text-black'>
            {description_en.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        )}
      </div>
      {/* Check for both so TS knows they are defined */}
      {onEdit && onSave ? (
        <div className='bg-gray-200 flex-col py-2 px-3'>
          <div className='flex justify-center'>
            <div className='flex justify-around -mt-4 px-3 w-full'>
              <span className='inline-block ring-4 ring-gray-200 rounded-full text-sm px-3 pt-0.5 bg-gray-200'>
                <label className='text-gray-800'>
                  <button onClick={() => (editing ? onSave(name, description_en, link) : onEdit())}>
                    <FontAwesomeIcon
                      className='text-purple-700'
                      icon={editing ? faSave : faPencilAlt}
                    />
                  </button>
                </label>
              </span>
              {onDelete ? (
                <span className='inline-block ring-4 ring-gray-200 rounded-full text-sm px-3 pt-0.5 bg-gray-200'>
                  <button
                    title='Delete'
                    onClick={() => {
                      deleteProject(id)
                      onDelete()
                    }}
                  >
                    <FontAwesomeIcon className='text-red-500' icon={faBan} />
                  </button>
                </span>
              ) : null}
            </div>
          </div>
          {editing ? (
            <input
              className='text-center w-full text-3xl bg-gray-200 text-gray-800'
              value={link}
              onInput={(e) => setLink((e.target as HTMLInputElement).value)}
            />
          ) : (
            <h2 className='text-center text-3xl text-gray-800 overflow-hidden'>{link}</h2>
          )}
        </div>
      ) : null}
    </div>
  )
}
