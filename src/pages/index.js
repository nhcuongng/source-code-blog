import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Posts from '../components/Posts'
import Guides from '../components/Guides'
import Projects from '../components/Projects'
import SEO from '../components/SEO'

import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

import projects from '../data/projects'
// import interviews from '../data/interviews'
// import speaking from '../data/speaking'

import nhcuong from '../../content/images/nhcuong.jpg'

export default function BlogIndex({ data }) {
  const latest = data.latest.edges
  const popular = data.popular.edges
  const simplifiedLatest = useMemo(() => getSimplifiedPosts(latest), [latest])
  const simplifiedPopular = useMemo(() => getSimplifiedPosts(popular), [
    popular,
  ])

  const Section = ({ title, children, button, ...props }) => (
    <section {...props}>
      <h2>
        {title}
        {button && (
          <Link className="section-button" to="/blog">
            View all
          </Link>
        )}
      </h2>
      {children}
    </section>
  )

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO />
      <section className="lead">
        <div className="container">
          <div className="copy">
            <h1>
              Hey! Tôi là Cường
              <br /> Tôi là lập trình viên cùi bắp 👨‍🌾
            </h1>
            <p>
              Đây là blog cá nhân của tôi, nơi tôi chia sẻ những gì học được và những kinh nghiệm làm việc.
              Mình chủ yếu làm việc với Javascript (Typescript), cụ thể là React Js và Node Js.
              {' '}Bạn có thể đọc blog của mình tại {' '}
              <Link to="/blog">đây</Link>{' '}
              hoặc tìm hiểu thêm{' '}
              <Link to="/me">về mình</Link>.
            </p>
            <a
              href="mailto:cuong.nguyenhuu1997@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              <span className="emoji">💌</span> Contact to me
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfg1e-EZU3s5EJotrWram7_hjkx82vtJXU4aWABkSsaKMXZEQ/viewform?usp=sf_link"
              target="_blank"
              rel="noreferrer"
              className="button secondary"
            >
              <span className="emoji">📣</span>
              Give Feedback
            </a>
          </div>

          <div className="image">
            <img src={nhcuong} alt="Tania" />
          </div>
        </div>
      </section>
      <div className="container index">
        <Section title="Bài viết mới nhất" button>
          <Posts data={simplifiedLatest} tags withDate />
        </Section>
        <Section title="Bài viết phổ biến" button>
          <Posts data={simplifiedPopular} tags withDate />
        </Section>
        <Section title="Projects">
          <Projects data={projects} />
        </Section>
        {/* <Section title="Interviews">
          <Guides data={interviews} />
        </Section>
        <Section title="Speaking">
          <Guides data={speaking} />
        </Section> */}
        <Section title="Source">
          <p>
            Thanks to <a href="https://www.taniarascia.com/">Tania Rascia</a> for awsome template
          </p>
          <a
            href="https://github.com/taniarascia/taniarascia.com/"
            target="_blank"
            rel="noreferrer"
            className="button"
          >
            <span className="emoji">🤞 </span> source this template
          </a>
        </Section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" }, released: { eq: true } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY") 
            title
            tags
          }
        }
      }
    }
    popular: allMarkdownRemark(
      limit: 20
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" }, released: { eq: true } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
