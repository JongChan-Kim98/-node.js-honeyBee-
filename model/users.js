const Sql = require('sequelize');
// User 클래스에서 시퀄라이즈 안에 모듈 객체의 기능을 상속시켜주기 위해서 User 클래스에서 Sql.Model 기능을 준다.
class User extends Sql.Model{
    // static init 메서드에서 테이블을 생성해주는건데 사용하면 테이블을 생성 및 연결까지(매핑) 구성 
    static init(sequelize){ // 상속받은 함수를 쓰려면 super 사용 // init함수의 첫번째 매개변수가 테이블의 구성
        // 컬럼이 뭐뭐있는지 그 타입과 속성이 뭔지 여기에 정리해서 테이블 생성 해줌 매핑해줌
        // 두번째 테이블 자체에 대한 설정값을 객체로 전달 
        return super.init(
            {
                // primaryKey 회원번호
                // no : {
                //     type : Sql.INTEGER(255),
                //     allowNull: false,
                //     primaryKey: true,
                //     autoIncrement : true
                // },

                // name 컬럼 하나
                name : {
                    type : Sql.STRING(20),
                    // 이 값이 무조건 있어야하는지 이 컬럼값이 없으면 안된다고 표시하는것.
                    allowNull: false,
                    // false면은 없으면 안돼. true면은 없어도 돼.
                    //unique:true,
                    // 고유키로 사용할 것인지 여기서는 컬럼에 name 값이 겹치지 않도록 사용
                    // 주민번호나 전화번호 겹치지 않는 값들 혹여나 안 겹치게
                    // 중복되지 않는 키
                },
                // 나이 컬럼 
                age : {
                    type: Sql.INTEGER,
                    allowNull : false,
                },
                nickName : {
                    type: Sql.STRING(255),
                    allowNull : false,
                    unique:true,
                },
                sex : {
                    type : Sql.STRING(255),
                    allowNull : false,
                },
                address : {
                    type : Sql.STRING(255),
                    allowNull: false,
                },
                phoneNumber : {
                    type : Sql.INTEGER,
                    allowNull : false,
                },
                birthDate : {
                    type : Sql.STRING(255),
                    allowNull : false,
                },
                userPassword : {
                    type : Sql.STRING(255),
                    allowNull : false,
                },
                userId : {
                    type : Sql.STRING(255),
                    allowNull : false,
                    unique:true,
                },
                userEmail : {
                    type : Sql.STRING(255),
                    allowNull : false,
                },
                profilePicture : {
                    type : Sql.STRING,
                    allowNull:true,
                    BLOB : true
                }


            },

            {
                // sequelize : 위에서 매개변수 쓴걸 연결 시켜주는 옵션, 이름은 무조건 sequelize설정
                sequelize, 
                // false로 했을때 
                underscored : false, // created_at 가 createdAt 이렇게 바뀐다. underscored 시퀄라이즈는 기본적으로 userData 카멜 표기법인데 스네이크 표기법으로 바꿔주는 옵션 
                // 얘는 모델의 이름을 설정할 수 있다. 
                modelName : "User", // 관계형으로 구성할때 사용합니다.
                tableName: "users", // 데이터 베이스의 테이블의 이름을 설정한다.
                paranoid : false, // paranoid true로 설정하면 deletedAt이라는 칼럼이 만들어집니다. 컬럼값은 남아있고 deleteAt이 값에 삭제한 시간이 추가된다.
                // charset, collate : 각각 밑에 처럼 설정해주면 한글이 입력 가능하게 되고.
                // 이모티콘같은것도 쓸려면 utf-8 뒤에 mb4붙이면댐
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        );
    }
    // 1:N (foreignkey) 외래키
    static associate(db){
        // 1:N 관계(hasMany, belongTo)
        // 시퀄라이즈에서 1:N 관계를 hasMany 함수로 정의를 한다.
        // hasMany 함수를 이용해서 테이블의 관계를 정의해준다. // 첫번째 매개변수로 연결할 테이블 
        // soutceKey User테이블 안에 무슨 키를 foreignKey와 연결할지
        // hasMany()첫번째로 넘겨준 테이블이 foreignKey 와 연결되고 foreignKey 이름은 user_id다.
        db.User.hasMany(db.MyPage, {foreignKey: "user_nickName", sourceKey: "nickName"});
    }
}

module.exports = User;