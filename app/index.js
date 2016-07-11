'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Behold the almighty ' + chalk.red('generator-mljs-packages') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname // Default to current folder name
    }, {
      type: 'input',
      name: 'userName',
      message: 'Your name'
    }, {
      type: 'input',
      name: 'description',
      message: 'Your package description'
    }, {
      type: 'input',
      name: 'version',
      message: 'Your package version',
      default: '0.0.1'
    }, {
      type: 'confirm',
      name: 'install',
      message: 'Run NPM install?'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.name;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var includes = {
      name: this.props.name,
      userName: this.props.userName,
      version: this.props.version,
      description: this.props.description,
      date: year + '-' + month + '-' + day,
      year: year
    };

    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('travis.yml'), this.destinationPath('.travis.yml'));
    this.fs.copy(this.templatePath('eslintrc.yml'), this.destinationPath('.eslintrc.yml'));
    this.fs.write(this.destinationPath('src/index.js'), '\'use strict\';\n');
    this.fs.write(this.destinationPath('test/test.js'), '\'use strict\';\n');

    this.fs.copyTpl(this.templatePath('History.md'), this.destinationPath('History.md'), includes);
    this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationPath('LICENSE'), includes);
    this.fs.copyTpl(this.templatePath('npm'), this.destinationPath('package.json'), includes);
    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), includes);
  },

  install: function () {
    if (this.props.install) {
      this.npmInstall();
    }
  }
});
