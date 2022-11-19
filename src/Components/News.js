import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:6,
    category:"general"
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
  article = [
    {
      source: {
        id: "techcrunch",
        name: "TechCrunch",
      },
      author: "Ron Miller",
      title:
        "Weka announces $135M investment on $750M valuation to change how companies move data",
      description:
        "Weka announced a $135M Series D today on a $750M valuation for their data pipeline solution, a hefty amount these days.",
      url: "https://techcrunch.com/2022/11/15/weka-announces-135m-investment-on-750m-valuation-to-change-how-companies-move-data/",
      urlToImage:
        "https://techcrunch.com/wp-content/uploads/2022/11/GettyImages-160000854-2.jpg?resize=1200,800",
      publishedAt: "2022-11-15T13:33:36Z",
      content:
        "If theres one thing that gets the attention of investors, even in uncertain times like these, its data efficiency. Data is the fuel for machine learning models and getting it from point A to point B … [+3442 chars]",
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let myurl =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f3fa8cd26d254839a5dd006ac451ab6a&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
      let data = await fetch(myurl);
    let parsedData = await data.json();
    this.setState((this.article = parsedData.articles));
    this.setState({
      totalResults: parsedData.totalResults,
      loading:false
    });
  }

  handlPrevClk = async () => {
    let myurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f3fa8cd26d254839a5dd006ac451ab6a&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(myurl);
    let parsedData = await data.json();
    this.setState((this.article = parsedData.articles));
    this.setState({
      page: this.state.page - 1,
      loading:false
    });
  };

  handlNextClk = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let myurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f3fa8cd26d254839a5dd006ac451ab6a&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(myurl);
      let parsedData = await data.json();
      this.setState((this.article = parsedData.articles));
      this.setState({
        page: this.state.page + 1,
        loading:false
      });
    }
  };

  render() {
    return (
      <div className="container my-1">
       <h3 className="display-6 text-center" style={{marginTop:"70px"}}>NewsMonkey-Top HeadLines</h3>
       {this.state.loading && <Spinner/>}
        <div className="row my-4 justify-content-evenly">
          {!this.state.loading && this.article.map((element) => {
            return (
              <div className="col-md-4 " key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0,116): ""}
                  desc={
                    element.description
                      ? element.description.slice(0, 95)
                      : "NewsMonkey is a news app which can be use to grab daily news bites.If you are interested in news,wheather,politics and sports then NewsMonkey is for you.".slice(
                          0,
                          95
                        )
                  }
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://images.indianexpress.com/2022/11/Polluted-white-dwarf-star-20221115.jpg"
                  }
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark "
            onClick={this.handlPrevClk}
          >
            &#x2190; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark "
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            onClick={this.handlNextClk}
          >
            Next &#x2192;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
