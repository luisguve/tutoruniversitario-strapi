'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    const userCanPostReview = async (user, slug) => {
      // Check if user purchased the course.
      const student = await strapi.db.query("plugin::masterclass.mc-student-course").findOne(
        {
          where: {
            student: user.id,
            course: {
              slug
            }
          }
        }
      )
      if (!student) {
        return false
      }
      return true
    }

    strapi.service("plugin::ratings.review").userCanPostReview = userCanPostReview
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
