import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Sensor Services',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
      The best solution ever created.
      </>
    ),
  },
  {
    title: 'IA/ML - Cognitive Services',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
      I am the greatest intelligence.<br/>
      I am greater than myself. 
      </>
    ),
  },
  {
    title: 'Storage Services',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
      I store the world and more and more <br/> and more and more... 
      </>
    ),
  },
  {
    title: 'Server',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <> 
      No one is faster than me at serving.<br/>
      I can serve what you don't even know you want yet. 
      </>
    ),
  },
  {
    title: 'Webpage',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
      To see or not to see? That is the question. 
      </>
    ),
  },
  {
    title: 'Mobile App',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        I'm great, I'm awesome, I'm ... ... ...  <br/> "empty battery"
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
