const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ProjectModel = require('./models/Projects');

const path = require('path');
const logger = require('morgan');
const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/api/test', (req, res) => {
  res.send('test');
});

mongoose.connect(
  'mongodb+srv://samertaha:5NqAeoPR@cluster0.ccilm2c.mongodb.net/portfolio'
);

app.get('/getProjects', (req, res) => {
  ProjectModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});
app.get('/getProject/:id', (req, res) => {
  let id = req.params.id;
  ProjectModel.findById(id, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.delete('/project/:id', (req, res) => {
  let id = req.params.id;
  console.log('delete id: ', id);
  ProjectModel.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      console.log('error', err);
      res.json(err);
    } else {
      console.log('success', result);
      res.json(result);
    }
  });
});

app.post('/createProject', async (req, res) => {
  const project = req.body;
  const newProject = new ProjectModel(project);
  await newProject.save();

  res.json(newProject);
});

app.put('/updateProject/:id', async (req, res) => {
  console.log('im here!');
  const updatedProject = await ProjectModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  try {
    res.status(200).json({
      status: 'Success',
      data: {
        updatedProject,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.use(express.static(path.join(__dirname, './frontend/build')));

app.get('*', function (_, res) {
  res.sendFile(
    path.join(__dirname, './frontend/build/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server Running on port ${port}`));

module.exports = app;
