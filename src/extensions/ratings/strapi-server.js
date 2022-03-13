'use strict';

const create = async (ctx) => {
  const { user } = ctx.state
  if (!user) {
    return ctx.badRequest("The user should be authenticated")
  }
  const { slug } = ctx.params
  // First check if user purchased the course.
  /*const student = await strapi.db.query("plugin::masterclass.mc-student-course").findOne(
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
    return ctx.forbidden("User did not purchase this course")
  }*/

  const { comment, score } = ctx.request.body
  if (!score) {
    return ctx.badRequest("Score should be between 1-5", {slug, comment, score})
  }
  // Only one review per user is allowed.
  // Check if the user has already posted a review.
  const review = await strapi.db.query("plugin::ratings.review").findOne({
    select: ["id"],
    where: {
      related_to: { slug },
      author: user.id
    }
  })
  if (review) {
    return ctx.badRequest("User already posted a review. Review ID:", review.id)
  }
  // Get data of related content with the given slug
  // If not exists, this is the fist review
  // - create the contentID and grab the ID
  let relatedContent = await strapi.db.query("plugin::ratings.r-content-id").findOne({
    select: ["id", "average"],
    populate: {
      reviews: { fields: ["id"] }
    },
    where: { slug }
  })
  if (!relatedContent) {
    // First review ever for this content
    relatedContent = await strapi.entityService.create("plugin::ratings.r-content-id", {
      data: { slug, average: 0 },
      populate: {
        reviews: { fields: ["id"] }
      },
    })
  }
  // Create review and associate it with id.
  const newReview = await strapi.entityService.create("plugin::ratings.review", {
    data: {
      author: user.id,
      comment,
      score,
      related_to: relatedContent.id
    }
  })
  // Update average rating
  const oldTotalScore = relatedContent.average * relatedContent.reviews.length
  const newAvg = (oldTotalScore + score) / (relatedContent.reviews.length + 1)
  await strapi.entityService.update("plugin::ratings.r-content-id", relatedContent.id, {
    data: {
      average: newAvg
    }
  })
  ctx.body = { id: newReview.id }
}

module.exports = (plugin) => {
  plugin.controllers.reviews.create = create;

  return plugin;
};
