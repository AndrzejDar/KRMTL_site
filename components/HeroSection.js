import HeroStyles from "../styles/HeroSection.module.scss";

const HeroSection = ({content:{title, subtitle, img}}) => {
  const titleArry = [...Object.values(title.text)];
  return (
    <div className={HeroStyles.hero}>
        <img src={img.src} alt={img.alt} />
        {titleArry.map((text, id)=> <h1 key={id} dangerouslySetInnerHTML={{__html:text}}></h1>)}
        <p className='accent-text'>{subtitle.text}</p>
    </div>
  );
};

export default HeroSection;
