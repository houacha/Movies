namespace MovieLibrary.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class tookoffaprop : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Movies", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Movies", "Name", c => c.String());
        }
    }
}
