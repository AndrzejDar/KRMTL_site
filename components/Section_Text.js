import React from 'react'
import sectionStyle from '../styles/section.module.scss'

const Section_Text = ({content: {title, subtitle, content}}) => {
    console.log(content);
    const paragraphs = [...Object.values(content)]
    
  return (
    <div className={sectionStyle.section}>
        <h2>{title.text}</h2>
        <span className={sectionStyle.subtitle}>{subtitle.text}</span>
        {console.log(Object.keys(content).length)}
        {paragraphs.map((paragraph, id)=><p key={id} >{paragraph.text}</p>)}
    </div>

  )
}

export default Section_Text