import React, { Component } from "react";
import Style from "./NewsItem.module.css";

export class NewsItem extends Component {
  render() {
    let { title, desc, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div>
        <div className={`card my-3 ${Style.box}`}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'86%',zIndex:1}}>
               {source}
              </span>
            </h5>
            <p className="card-text">{desc} ...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
