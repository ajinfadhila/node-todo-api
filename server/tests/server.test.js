const expect = require("expect");
const request = require("supertest");

const {ObjectID} = require('mongodb');
const {app} = require("./../server");
const{Todo} = require("./../models/todo")

const todos = [{
  _id: new ObjectID(),
  text: "first text"
},{
  _id: new ObjectID(),
  text:"second text",
  completed:true,
  completedAt:333
},{
    _id: new ObjectID(),
    text: "3 text"
}]

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text = "text todo";
    request(app).post('/todos').send({text}).expect(200).expect((res)=>{
      expect(res.body.text).toBe(text);
    }).end((err,res)=>{
      if (err) {
        return done(err);
      }

      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    })
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(todos.length);
          done();
        }).catch((e) => done(e));
      });
  });
});

// describe('Get /todos', () =>{
//   it('should get all todos',(done) => {
//     request(app)
//     .get('/todos')
//     .expect(200)
//     .expect((res)=>{
//       expect(res.body.todos.length).toBe(todos.length);
//     }).end(done);
//   });
// });

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH todos/:id', ()=>{


  it('wajib update todo',(done)=>{
    //ambil todo pertama kali
    var hexId = todos[0]._id.toHexString()
    var text =  "ini wajib text baru"
    // update todo set todo pertama kali
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed:true,
        text
      })
    //200
    .expect(200)
    // text is change, compleate is true, compleate is number toBeA
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number')
    })
    .end(done);
  });

  //
  it('wajib clear completedAt, ketika todo nya ga compleate',(done)=>{
    var hexId = todos[1]._id.toHexString()
    var text =  "ini wajib text baru"
    // update todo set todo pertama kali
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed:false,
        text
      })
    //200
    .expect(200)
    // text is change, complated is false, completedAt is null. toNotExist
    .expect((res)=>{
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  })
})
