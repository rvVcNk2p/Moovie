import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateMyFilm, selectMyFilm } from "../../actions/myFilm";
import FilmChip from "../film/FilmChip";
// Material-UI elements
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
// Material-UI Icons
import StarBorderIcon from "@material-ui/icons/StarBorder";

const CreateFilm = ({ selectedMyFilm, selectMyFilm, updateMyFilm }) => {
  const [formData, setFormData] = useState({
    _id: undefined,
    filmId: {},
    rating: 0,
    note: "",
  });

  const { _id, filmId, rating, note } = formData;

  const pageParams = useParams()["id"];
  useEffect(() => {
    // Fetch initial myFilm by param ID
    selectMyFilm(pageParams);
  }, [pageParams, selectMyFilm]);

  useEffect(() => {
    if (Object.keys(selectedMyFilm).length !== 0) {
      if (selectedMyFilm.rating === null || selectedMyFilm.note === null) {
        setFormData({ ...formData, ...selectedMyFilm, rating: 0, note: "" });
      } else setFormData({ ...formData, ...selectedMyFilm });
    }
    // If fech completed, set to the local variables
    return () => {
      setFormData({
        ...formData,
        _id: undefined,
        filmId: {},
        rating: 0,
        note: "",
      });
    };
  }, [selectedMyFilm]);

  const onSubmit = (e) => {
    e.preventDefault();
    updateMyFilm({ ...selectedMyFilm, rating, note });
  };

  const onChange = (e) => {
    const inputName = e.target.name;
    if (inputName === "rating") {
      setFormData({ ...formData, [inputName]: parseFloat(e.target.value) });
    } else setFormData({ ...formData, [inputName]: e.target.value });
  };

  // Material UI CSS
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 385,
    },
    chips: {
      display: "flex",
      whiteSpace: "none",
    },
    chip: {
      margin: 2,
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {pageParams === _id && (
        <div className={classes.paper}>
          <Box>
            <img
              src={filmId.coverURI}
              alt="film-cover"
              style={{ maxWidth: 150, borderRadius: 5 }}
            ></img>
          </Box>
          <Typography component="h1" variant="h5">
            {filmId.name}
          </Typography>
          <Rating
            name="rating"
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            value={rating}
            max={10}
            precision={0.5}
            onChange={(e) => onChange(e)}
          />
          {`${rating} star out of 10`}
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  component="div"
                  style={{ textAlign: "center", marginBottom: 20 }}
                >
                  {filmId.categories.map((category) => {
                    return (
                      <FilmChip category={category} key={category._id + _id} />
                    );
                  })}
                </Box>
                <div>
                  <div>{`Your thoughts about this film:`}</div>
                  <textarea
                    style={{ width: "100%", borderRadius: "5", minHeight: 100 }}
                    value={note}
                    name="note"
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
              // disabled={!isFieldsAreValid()}
              endIcon={<AddIcon />}
              onClick={(e) => onSubmit(e)}
            >
              UPDATE
            </Button>
          </form>
        </div>
      )}
    </Container>
  );
};

CreateFilm.propTypes = {
  selectedMyFilm: PropTypes.object.isRequired,
  updateMyFilm: PropTypes.func.isRequired,
  selectMyFilm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedMyFilm: state.myFilm.selectedMyFilm,
});

export default connect(mapStateToProps, { updateMyFilm, selectMyFilm })(
  CreateFilm
);
